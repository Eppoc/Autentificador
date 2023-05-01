       // Import the functions you need from the SDKs you need
       import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
       import { getFirestore, collection, doc, getDoc, setDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
       // TODO: Add SDKs for Firebase products that you want to use
       // https://firebase.google.com/docs/web/setup#available-libraries
     
       // Your web app's Firebase configuration
       const firebaseConfig = {
         apiKey: "AIzaSyBsFoa3Ts5hE-YKZYNLnyIvi9LNiHh371I",
         authDomain: "qr-sup.firebaseapp.com",
         databaseURL: "https://qr-sup-default-rtdb.firebaseio.com",
         projectId: "qr-sup",
         storageBucket: "qr-sup.appspot.com",
         messagingSenderId: "408589030118",
         appId: "1:408589030118:web:f56d336affb4787214a127"
       };
     
       // Initialize Firebase
       const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
function verificar(resulta) {
    //var urlParams = new URLSearchParams(window.location.search);
    const cadena = resulta;
const partes = cadena.split("/");
const resultado = partes[partes.length - 1];
console.log(resultado);
    var id = resultado;
    //var inv = urlParams.get('inv');
    console.log(id);
    
    const datosRef = doc(db, "datos", id);
  
    getDoc(datosRef).then((doc) => {
      if (doc.exists()) {
        //console.log("Datos del documento:", doc.data());
        let Cqr = doc.data().qr;
        let invitado = doc.data().invitado;
          let invitador = doc.data().mail;
       
          const INV_VALIDO = "ES INVITADO Y VÁLIDO";
          const INV_REP_VALIDO = "INVITADO REPETIDO";
          const VALIDO ="ES VÁLIDO";
          const REP_VALIDO = "ESTÁ REPETIDO";
          
        
        
  
        if (doc.data().invitado){
         
          document.getElementById("user").innerHTML = "El Usuario <br>"+"<strong>" + invitado + "</strong>"+"<br><br>" + INV_VALIDO + "<br><br>Invitado por <br>" + "<strong>"+invitador+"</strong>" ;
          document.getElementById("mail").innerHTML = invitado;
       
      }else{
         
          document.getElementById("user").innerHTML = "El Usuario " + "<strong>"+ invitador +"</strong>"+ "<br><br>" + VALIDO;
          document.getElementById("mail").innerHTML = invitador;
      
      }
        //yea
        setDoc(datosRef, { registrado: true }, { merge: true })
          .then(() => {
            console.log("Usuario Confirmado en Evento");
        
          })
          .catch((error) => {
            console.log("Error al registrar el valor:", error);
            
          });
           let inicio=1;
          let valor_actual = doc.data().contador_reg;
            console.log(valor_actual);
            let suma = valor_actual + 1;
            console.log("suma"+suma);
         
          if (doc.data().contador_reg) {
            
            setDoc(datosRef, { contador_reg: suma }, { merge: true })
          .then(() => {
            console.log("Y Contando...123" );
        
          })
          .catch((error) => {
            console.log("Error al registrar el valor:", error);
            
          });
          }else{
            console.log("cero");
            setDoc(datosRef, { contador_reg: inicio }, { merge: true })
          .then(() => {
            console.log("Y Contando..." );
        
          })
          .catch((error) => {
            console.log("Error al registrar el valor:", error);
            
          });
          }
  
        if (doc.data().registrado) {
          if (doc.data().invitado){
          console.log("El usuario ya se <br> registro en el Evento", doc.data().registrado);
          //document.getElementById("user").innerHTML = "EL USUARIO ESTÁ REPETIDO";
          document.getElementById("user").innerHTML = "El Usuario <br>"+"<strong>" + invitado + "</strong>"+"<br><br>" + INV_REP_VALIDO + "<br><br>Invitado por <br>" + "<strong>"+invitador+"</strong>" ;
          document.getElementById("registro").innerHTML = "EL USUARIO YA SE <br> REGISTRÓ EN EL EVENTO";
          document.getElementById("data-even").style.background = "red";
          document.getElementById("data-even").style.color = "white";
          } else{
              document.getElementById("user").innerHTML = "El Usuario " + "<strong>"+ invitador +"</strong>"+ "<br><br>" + REP_VALIDO;   
              document.getElementById("registro").innerHTML = "EL USUARIO YA SE <br> REGISTRÓ EN EL EVENTO";
              document.getElementById("data-even").style.background = "red";
          document.getElementById("data-even").style.color = "white";
          } 
      } else {
          console.log("El usuario no se ha registrado");
          document.getElementById("registro").innerHTML = "REGISTRADO EN EVENTO";
          
        }
      } else {
        console.log("El documento no existe");
        document.getElementById("alarma").style.display = "block";
        
      }
    }).catch((error) => {
      console.log("Error al consultar el documento:", error);
     
    });
  };
  