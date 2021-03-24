import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Dropdown, DropdownButton, Row, Table } from 'react-bootstrap';
import EachLogTable from '../Reuse/EachLogTable';
import SidebarTable from '../Reuse/SidebarTable';
import { IGalleryQueryResult } from '../../../server/client-endpoints/src/type/client-server-type/type_gallery';
import { getModelAPI } from '../API/GetModel';
import { IModel, Model } from '../TSEntity/Model';
import { useSelector, useDispatch } from 'react-redux';
import { edit } from '../Redux/pageSlice';
import { RootState } from '../Redux/store';
import GetGallery from '../API/GetGallery';
import { editFilter } from '../Redux/filterSlice';
import { useRef } from 'react';
import { isConstructorDeclaration } from 'typescript';
import GalleryCardArea from './GalleryCardArea';

function Gallery() {

  const galleryPageNumber: number = 4;
  const noFilterNumber: number = 0;
  const normalNumber: number = 1;
  const defectedNumber: number = 2;
  let sidebarWidth:number = 1;
  let contentWidth:number = 11;

  //States in Redux
  let selectedModelID: string = useSelector((state: RootState) => state.selectedID );
  let filter: number = useSelector((state: RootState) => state.filter );
  let currentLogModelName: string = useSelector((state: RootState) => state.currentLogModelName );
  let currentLogFruitName: string = useSelector((state: RootState) => state.currentLogFruitName );
  let galleryData: IGalleryQueryResult[] = useSelector((state: RootState) => state.galleryData );

  const dispatch = useDispatch();

  const [sidebarTable, setSidebarTable] = useState<Model[]>([]);
  const [dummy, setDummy] = useState(0);

  const childRef: any = useRef();

  const showDropdownFilter = (filter: number) => {
    return filter===0 ? 'No Filter': filter === 1 ? 'Normal' : 'Defected';
  }

  const handleNoFilter = () => {
    console.log('handleNoFilter is executed.', selectedModelID);
    dispatch(editFilter(noFilterNumber));
    if(selectedModelID==''){
      alert('Warning: You should select a model first!');
      return;
    }
    //pass the requirement
    //childRef.current.getLogTableAPI();
    setDummy(dummy+1);
  }

  const handleNormal = () => {
    console.log('handleNormal is executed.', selectedModelID);
    dispatch(editFilter(normalNumber));
    if(selectedModelID==''){
      alert('Warning: You should select a model first!');
      return;
    }
    // console.log('debug1');
    // console.log(filter);    
    // childRef.current.getLogTableAPI();
    // console.log('debug2');
    setDummy(dummy+1);
  }

  const handleDefected = () => {
    console.log('handleDefected is executed.', selectedModelID);
    dispatch(editFilter(defectedNumber));
    if(selectedModelID==''){
      alert('Warning: You should select a model first!');
      return;
    }
    //childRef.current.getLogTableAPI();
    setDummy(dummy+1);
  }

  const setSidebar = () => {
    getModelAPI(setSidebarTable);
  }

  useEffect(() =>{
    dispatch(edit(galleryPageNumber));
    setSidebar();
    console.log('Welcome to our gallery!');
    childRef.current.getGalleryDataAPI();
  }, [dummy]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={sidebarWidth} sm={sidebarWidth} md={sidebarWidth} lg={sidebarWidth} xl={sidebarWidth} >
            <SidebarTable sidebarModelList={sidebarTable} dummy={dummy} setDummy={setDummy}/>
            {/* <p>{logA.timestamp}</p> */}
          </Col> 
          <Col xs={contentWidth} sm={contentWidth} md={contentWidth} lg={contentWidth} xl={contentWidth} style={{
            backgroundColor: 'white'
          }}>
            <Row>
              <Col xs={10} sm={10} md={11} lg={11} xl={11}>
                <p style={{ 
                  margin: '10px',
                  marginRight: '30px' 
                }}>Model name : {currentLogModelName}</p>
                <p style={{ 
                  margin: '10px',
                  marginRight: '30px' 
                }}>Fruit type : {currentLogFruitName}</p>
                <p style={{ 
                  margin: '10px', 
                  marginRight: '30px' 
                }}>Filter : {showDropdownFilter(filter)}</p>                
              </Col>
              <Col xs={2} sm={2} md={1} lg={1} xl={1}>
                <DropdownButton id="dropdown-basic-button" title={showDropdownFilter(filter)} className="text-right" style={{
                  justifyContent: 'center',
                  marginTop: '10px',
                  marginRight: '10px'
                }}>
                  <Dropdown.Item onClick={handleNoFilter}>No Filter</Dropdown.Item>
                  <Dropdown.Item onClick={handleNormal}>Normal</Dropdown.Item>
                  <Dropdown.Item onClick={handleDefected}>Defected</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            <Row>
              <GalleryCardArea />
            </Row>
            <Row>
              <GetGallery ref={childRef} />
              <p>{galleryData.length}</p>
            </Row>
          </Col> 
        </Row>
      </Container>
    </div>
  );
}

export default Gallery;
