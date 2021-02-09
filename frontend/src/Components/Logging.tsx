import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import EachLogTable from '../Reuse/EachLogTable';
import SidebarTable from '../Reuse/SidebarTable';
import { ILog, ILogging, ILogQueryParam, LoggingQueryResult } from '../../../server/client-endpoints/src/type/client-server-type/type_logging';
import { getModelAPI } from '../API/GetModel';
import { IModel, Model } from '../TSEntity/Model';
import { useDispatch } from 'react-redux';
import { edit } from '../Redux/pageSlice';

function Logging() {

  const loggingPageNumber: number = 3;
  const dispatch = useDispatch();

  let sidebarWidth:number = 1;
  let contentWidth:number = 11;

  const x = new Date();
  const logA:ILog = {timestamp: x.toDateString(), result: 1}
  const logB:ILog = {timestamp: x.toDateString(), result: 2}
  const ObjA: Model = new Model('Apple1', 'apple','Alice' ,x , 'Our first model', '1');

  const [logTable, setLogTable] = useState<ILog[]>([logA, logB]);
  const [sidebarTable, setSidebarTable] = useState<Model[]>([ObjA]);

  const setSidebar = () => {
    getModelAPI(setSidebarTable);
  }

  useEffect(() =>{
    dispatch(edit(loggingPageNumber));
    setSidebar();
  }, []);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={sidebarWidth} sm={sidebarWidth} md={sidebarWidth} lg={sidebarWidth} xl={sidebarWidth} >
            <SidebarTable sidebarModelList={sidebarTable}/>
            {/* <p>{logA.timestamp}</p> */}
          </Col> 
          <Col xs={contentWidth} sm={contentWidth} md={contentWidth} lg={contentWidth} xl={contentWidth} style={{
            backgroundColor: 'white'
          }}>
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
          </Col> 
        </Row>
      </Container>
    </div>
  );
}

export default Logging;
