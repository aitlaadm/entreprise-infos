import './App.css';
import SearchIcon from '@material-ui/icons/Search';
import Header from './Header'
import { useState } from 'react';
import Service from './Service/Service'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function App() {
  const [siret,setSiret]= useState('');
  const [resultTab,SetResTab]=useState([])
  const [open, setOpen]=useState(false)
  const InseeApi=(e)=>{
    e.preventDefault();
    Service.getInfos(siret).then(res=>{
      SetResTab([res.data.etablissement])
      if(resultTab.length>0){
        setOpen(true)
      }
    }).catch(err=>alert('Veuillez saisir un N°Siret valide'))
  }
  return (

    <div className="App">
      <Header/>
      <form  onSubmit={e=>InseeApi(e)} className='search'>
        <input type="text" placeholder="N°Siren 9 chiffres + 4 chiffres de numéro d'établissement Ex:(29913469100191)" onChange={e=>setSiret(e.target.value)}/> 
        <SearchIcon/>
      </form>
      <Modal isOpen={open} onRequestClose={()=>setOpen(false)} style={customStyles}>
          <h1>Informations générale:</h1>
          
          <div>
          {
            resultTab.map((t)=>
                <><h4>N°Siren : {resultTab[0].siren}</h4><h4>NIC : {resultTab[0].nic}</h4><h4>date de création: {resultTab[0].dateCreationEtablissement}</h4><h4>date de dernier traitement détablissement: {resultTab[0].dateDernierTraitementEtablissement}</h4><h4>Date création unité Legale: {resultTab[0].uniteLegale.dateCreationUniteLegale}</h4><h4>Dénomination unité Legale: {resultTab[0].uniteLegale.denominationUniteLegale}</h4><h4>Adresse: {resultTab[0].adresseEtablissement.numeroVoieEtablissement}, {resultTab[0].adresseEtablissement.typeVoieEtablissement} {resultTab[0].adresseEtablissement.libelleVoieEtablissement}, {resultTab[0].adresseEtablissement.codePostalEtablissement}, {resultTab[0].adresseEtablissement.libelleCommuneEtablissement} </h4><h4>Catégorie juridique Unité Légale {resultTab[0].uniteLegale.categorieJuridiqueUniteLegale}</h4><h4>Catégorie de l'entreprise {resultTab[0].uniteLegale.categorieEntreprise}</h4></>
            )
          }
          <button className='button' onClick={()=>setOpen(false)}>Fermer</button>
          </div>  
      </Modal>
    </div>
  );
}

export default App;
