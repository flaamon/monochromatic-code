import axios from 'axios';                                 import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';                              import paginationFactory from 'react-bootstrap-table2-paginator';                                                     import BootstrapTable from 'react-bootstrap-table-next';   import {useEffect, useState} from 'react';                 import {Modal,Button} from 'react-bootstrap';
import filterFactory,{textFilter} from 'react-bootstrap-table2-filter';
import './App.css';

function App() {
 
 const [data, setData] = useState([]);
 const [modalInfo,setModalInfo] = useState([]);
 const [showModal, setShowModal] =useState(false);

 const [show, setShow] = useState(false);
 const handleClose=()=>setShow(false);
 const handleShow=()=> setShow(true);

  useEffect(()=>{
	  getData();
   },[]);
 const getData= async()=>{
   const results = await axios(`https://restcountries.com/v3.1/all`); 
	 setData(results.data);                            
 };
 const imageFormatter=(cell,row)=>(<img style={{ maxWidth: "100%" }} src={cell} />);
 const renderEvents={
     onClick: (e,row)=>{
         setModalInfo(row);
         toggleTrueFalse();
	
     },                                                      };
 const toggleTrueFalse=()=>{                                     setShowModal(handleShow);
 };                                                         const ModalContent =({modalInfo,show})=>{                    return (                                                 <Modal show={show} onHide={handleClose}>                      <Modal.Header closeButton>                                        <Modal.Tittle>{modalInfo.name}</Modal.Tittle>       </Modal.Header>  
  <Modal.Body>                                                 <h1> Country Stats:</h1>                                   <p>Capital City:{modalInfo.capital[0]}</p> 
    <p>Status:{modalInfo.status}</p>       
    <p>Independence:{modalInfo.independence}</p>
    <p>Region:{modalInfo.region}</p>                          </Modal.Body>                                              <Modal.Footer>                                               <Button variant="warning" onClick={handleClose}>               Close                                                  </Button>                                                </Modal.Footer>                                          </Modal>);

 };
 const concatFormatter=(cell,row)=>{                                                                                     return cell.root + cell.suffixes[0];                                                                                 };
 const columns =[{                                            dataField:"flags.png",                                     text:"Flags",                                              formatter:imageFormatter,                                  },{                                                          dataField:"name.official",                                text:"Country Name",                                       sort: true,  
	   filter: textFilter(),    
	   rowEvents:renderEvents,
	    },
	    {                                                           dataField:"cca2",                                         text:"Country Code [2]",                                  },{                                                          dataField:"cca3",                                         text:"Country Code [3]",                                  },{                                                           dataField:"name.nativeName.zho.official",                text:"Native Country Name",                               },{                                                          dataField:"altSpellings",                                 text:"Alternative Country Name",                          },{                                                          dataField:"idd",                                          text:"Country Calling Codes",                              formatter:concatFormatter,                                }];
  return (
    <div className="App">
          {show&& modalInfo==0 ? <ModalContent modalInfo={modalInfo} show={showModal}/>:null}
       <BootstrapTable                                               keyField="id"
	  data={data }                                               columns={ columns}                                         striped                                                    hover                                                      condensed                                                  rowEvents={renderEvents} 
	  filter ={filterFactory()}
	  pagination={paginationFactory()}          /> 
    </div>
  );
}

export default App;
