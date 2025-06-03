var admin = require("firebase-admin");

var serviceAccount = require("./herramientasoft-bae8e-firebase-adminsdk-fbsvc-c4f3376084.json");
const { error } = require("console");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const database = admin.firestore();

const bibliotecaREF = database.collection("biblioteca");

const libro = {
    nombre : "Las almas muertas",
    autor  : "Nicolai Gogol",
    isbn   : 108475303854
}

/** 1 AGREGAR LIBROS A LA COLECCION */
bibliotecaREF.add( libro )
             .then( (docREF)=>{
                 console.log(`Se creo un nuevo libro ${docREF.id}`);  
             } )
             .catch( (error)=>{
                console.log("Se genero un error al crear el libro", error);
             } );

/** 2. OBTENER TODOS LOS LIBROS DE LA COLECCION */
bibliotecaREF.get()
             .then(( resultSet )=>{

                if( resultSet.empty ){
                    console.log(" No hay datos en la colección. ");
                }else{

                    resultSet.forEach( (libro)=>{
                        console.log(libro.id," ", libro.data())
                    } );

                }
             })
             .catch((error)=>{
                console.log("Se genero un error al crear el libro", error);
             } )

/** 3. ACTUALIZAR UN DOCUMENTO DE LA COLECCIÓN */
const id_libro = "usuario";
bibliotecaREF.doc(id_libro).update({
    genero: "Masculino"
}).then( () => { 
    console.log("El documento se actualizo correctamente ") } )
.catch( ( error )=>{
    console.log("Se genero un error al actualizar el documento", error);
} )

/** 4. ELIMINAR UN DOCUMENTO DE LA COLECCIÓN */

bibliotecaREF.doc(id_libro).delete()
.then( () => { console.log("Documento eliminado correctamente ")} )
.catch( () => { console.log("Hubo un error al eliminar el documento") } )

/** 5. BUSQUEDA DE UN DOCUMENTO EN LA COLECCIÓN */

bibliotecaREF.where("isbn",'==',109).get()
.then( ( resultSet ) => {
    if(resultSet.empty){
        console.log("No se encontraron libros con ese ISBN");
    }else{
        resultSet.forEach( ( doc )=>{
            console.log(doc.id , "=>" , doc.data() );
        } )
    }
 } )
.catch( (error) => { console.log("Hubo un error en la busqueda", error) } )

/** 6. BUSQUEDA DE UN DOCUMENTO EN LA COLECCIÓN DE FORMA ORDENADA */

bibliotecaREF.orderBy("nombre","desc").get()
.then( ( resultSet ) => { 
    if(resultSet.empty){
        console.log("No se encontraron libros");
    }else{
        resultSet.forEach( (doc)=>{
             console.log( doc.id, "=>" , doc.data());
        })
    }
  })
.catch( (error)=>{
     console.log("Hubo un error al realizar la busqueda", error);
} )