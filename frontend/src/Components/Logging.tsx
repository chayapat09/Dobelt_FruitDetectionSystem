import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Dropdown, DropdownButton, Row, Table } from 'react-bootstrap';
import EachLogTable from '../Reuse/EachLogTable';
import SidebarTable from '../Reuse/SidebarTable';
import { ILog, ILogging, ILogQueryParam, LoggingQueryResult } from '../../../server/client-endpoints/src/type/client-server-type/type_logging';
import { getModelAPI } from '../API/GetModel';
import { IModel, Model } from '../TSEntity/Model';
import { useSelector, useDispatch } from 'react-redux';
import { edit } from '../Redux/pageSlice';
import { RootState } from '../Redux/store';
import GetLogTable from '../API/GetLogTable';
import { editFilter } from '../Redux/filterSlice';
import { useRef } from 'react';
import { isConstructorDeclaration } from 'typescript';

function Logging() {

  const loggingPageNumber: number = 3;
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
  let logTable: ILog[] = useSelector((state: RootState) => state.logTable );

  const dispatch = useDispatch();

  const x = new Date();
  const logA:ILog = {timestamp: x.toDateString(), result: 1}
  const logB:ILog = {timestamp: x.toDateString(), result: 2}
  const ObjA: Model = new Model('Apple1', 'apple','Alice' ,x , 'Our first model', '1');

  const [sidebarTable, setSidebarTable] = useState<Model[]>([]);
  const [dummy, setDummy] = useState(0);

  const childRef: any = useRef();

  const showDropdownFilter = (filter: number) => {
    return filter===0 ? 'All': filter === 1 ? 'Cat' : 'Dog';
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
    dispatch(edit(loggingPageNumber));
    setSidebar();
    console.log('rerender logging page.');
    childRef.current.getLogTableAPI();
  }, [dummy]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={3} sm={2} md={2} lg={2} xl={sidebarWidth} >
            <SidebarTable sidebarModelList={sidebarTable} dummy={dummy} setDummy={setDummy}/>
            {/* <p>{logA.timestamp}</p> */}
          </Col> 
          <Col xs={9} sm={10} md={10} lg={10} xl={contentWidth} style={{
            backgroundColor: 'white'
          }}>
            <Row>
              <Col xs={8} sm={9} md={10} lg={10} xl={11}>
                <p style={{ 
                  margin: '10px',
                  marginRight: '30px' 
                }}>Model name : {currentLogModelName}</p>
                <p style={{ 
                  margin: '10px',
                  marginRight: '30px' 
                }}>Type of Object : {currentLogFruitName}</p>
                <p style={{ 
                  margin: '10px', 
                  marginRight: '30px' 
                }}>Filter : {showDropdownFilter(filter)}</p>                
              </Col>
              <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                <DropdownButton id="dropdown-basic-button" title={showDropdownFilter(filter)} className="text-right" style={{
                  justifyContent: 'center',
                  marginTop: '10px',
                  marginRight: '10px'
                }}>
                  <Dropdown.Item onClick={handleNoFilter}>All</Dropdown.Item>
                  <Dropdown.Item onClick={handleNormal}>Cat</Dropdown.Item>
                  <Dropdown.Item onClick={handleDefected}>Dog</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            <Row>
              <Table bordered hover style={{
                marginTop: '20px'
              }}>
                <thead>
                  <tr>
                    <th style={{width: "25%"}}>#</th>
                    <th style={{width: "50%"}}>Timestamp</th>
                    <th style={{width: "25%"}}>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <EachLogTable numberOfFruit={0} timestamp='Sunday' result='ok' />
                  <tr>
                    <td>1</td>
                    <td>Monday</td>
                    <td>passed</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Tuesday</td>
                    <td>wasted</td>
                  </tr> */}
                  {logTable.map((eachLog, index) => {
                    const {timestamp, result} = eachLog;
                    return (
                      <EachLogTable numberOfFruit={index} timestamp={timestamp} result={result} />
                    );
                  })}
                </tbody>
              </Table>
            </Row>
            <Row>
              <GetLogTable ref={childRef} />
            </Row>
          </Col> 
        </Row>
      </Container>
    </div>
  );
}

export default Logging;
