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
import { getLogTableAPI } from '../API/GetLogTable';

function Logging() {

  const loggingPageNumber: number = 3;
  const noFilterNumber: number = 0;
  const normalNumber: number = 1;
  const defectedNumber: number = 2;
  let sidebarWidth:number = 1;
  let contentWidth:number = 11;

  const selectedModelID: string = useSelector((state: RootState) => state.selectedID );
  const dispatch = useDispatch();

  const x = new Date();
  const logA:ILog = {timestamp: x.toDateString(), result: 1}
  const logB:ILog = {timestamp: x.toDateString(), result: 2}
  const ObjA: Model = new Model('Apple1', 'apple','Alice' ,x , 'Our first model', '1');

  const [filter, setFilter] = useState(0);
  const [currentLogModelName, setCurrentLogModelName] = useState('');
  const [currentLogFruitName, setCurrentLogFruitName] = useState('');
  const [logTable, setLogTable] = useState<ILog[]>([logA, logB]);
  const [sidebarTable, setSidebarTable] = useState<Model[]>([ObjA]);

  const showDropdownFilter = (filter: number) => {
    return filter===0 ? 'No Filter': filter === 1 ? 'Normal' : 'Defected';
  }

  const handleNoFilter = () => {
    console.log('handleNoFilter is executed.', selectedModelID);
    setFilter(noFilterNumber);
    if(selectedModelID==''){
      alert('Warning: You should select a model first!');
      return;
    }
    //pass the requirement
    getLogTableAPI(setLogTable, setCurrentLogModelName, setCurrentLogFruitName, selectedModelID, noFilterNumber);
  }

  const handleNormal = () => {
    console.log('handleNormal is executed.', selectedModelID);
    setFilter(normalNumber);
    if(selectedModelID==''){
      alert('Warning: You should select a model first!');
      return;
    }
    getLogTableAPI(setLogTable, setCurrentLogModelName, setCurrentLogFruitName, selectedModelID, normalNumber);
  }

  const handleDefected = () => {
    console.log('handleDefected is executed.', selectedModelID);
    setFilter(defectedNumber);
    if(selectedModelID==''){
      alert('Warning: You should select a model first!');
      return;
    }
    getLogTableAPI(setLogTable, setCurrentLogModelName, setCurrentLogFruitName, selectedModelID, defectedNumber);
  }

  const setSidebar = () => {
    getModelAPI(setSidebarTable);
  }

  useEffect(() =>{
    dispatch(edit(loggingPageNumber));
    setSidebar();
  }, [setLogTable]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={sidebarWidth} sm={sidebarWidth} md={sidebarWidth} lg={sidebarWidth} xl={sidebarWidth} >
            <SidebarTable sidebarModelList={sidebarTable}
                          filter={filter}
                          setLogTable={setLogTable}
                          setCurrentLogModelName={setCurrentLogModelName}
                          setCurrentLogFruitName={setCurrentLogFruitName}/>
            {/* <p>{logA.timestamp}</p> */}
          </Col> 
          <Col xs={contentWidth} sm={contentWidth} md={contentWidth} lg={contentWidth} xl={contentWidth} style={{
            backgroundColor: 'white'
          }}>
            <Row>
              <div>
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
                }}>Filter : {showDropdownFilter(filter)       }</p>                
              </div>
              <DropdownButton id="dropdown-basic-button" title={showDropdownFilter(filter)} className="pull-right" style={{
                marginTop: '10px',
                marginRight: '10px'
              }}>
                <Dropdown.Item onClick={handleNoFilter}>No Filter</Dropdown.Item>
                <Dropdown.Item onClick={handleNormal}>Normal</Dropdown.Item>
                <Dropdown.Item onClick={handleDefected}>Defected</Dropdown.Item>
              </DropdownButton>
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
          </Col> 
        </Row>
      </Container>
    </div>
  );
}

export default Logging;
