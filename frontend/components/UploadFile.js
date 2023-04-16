import {useEffect, useState} from "react";
import axios from "axios";


export default function Home({uploadImage,setUploadImage}) {
 const [selectedFile, setSelectedFile] = useState(null);
 const [isUploaded, setIsUploaded] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [buttonDisabled, setButtonDisabled] = useState(false);
 const onFileChange = (event) => {
  setSelectedFile(event.target.files[0]);
  // var reader = new FileReader;
  // reader.readAsText(event.target.files[0]);
  // console.log('reader : ', reader );
 }

 const replaceToSpace = (val) => {
  for (const x in val) {
   if (val[x] === ' ') {
    val = val.replace(' ', '-')
   }
  }
  return val

 }

 // useEffect(() => {
 //  if(uploadImage === null){
 //   setUploadImage('')
 //   setSelectedFile(false)
 //   setButtonDisabled(false)
 //   setIsUploaded(false)
 //  }
 // },[uploadImage])
 console.log('uploadImage : ', uploadImage)
 const trChars = (val) => {
  var letters = {
   'ğ': 'g',
   'ü': 'u',
   'ş': 's',
   'ı': 'i',
   'ö': 'o',
   'ç': 'c',
   'Ğ': 'G',
   'Ü': 'U',
   'Ş': 'S',
   'İ': 'I',
   'Ö': 'O',
   'Ç': 'C',
  };
  val = val.replace(/[ğüşııöçĞÜŞİÖÇ]/gu, function (letter) {
   return letters[letter];
  })
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  const values = uniqueSuffix + "-" + val.toLowerCase()
  return replaceToSpace(values)
 }
 const onFileUpload = () => {
  if (selectedFile === null) { return alert('Lütfen bir resim seçiniz.') }
  setIsLoading(true)
  setIsUploaded(true)
  const imageName = trChars(selectedFile.name)
  setUploadImage(imageName)
  var fd = new FormData();
  fd.append('file', selectedFile, imageName);
  var config = {
   method: 'post',
   url: 'http://localhost:5000/fileUpload',
   data: fd
  };
  axios(config)
   .then(function (response) {
    setTimeout(() => {
     setIsLoading(false)

    },1500)
    setTimeout(() => {
     setIsUploaded(false)
     setButtonDisabled(true)
    },3000)
    // alert('Resim başarıyla yüklendi.')
    console.log(JSON.stringify(response.data));

   })
   .catch(function (error) {
    console.log(error);
   });

 }
 // useEffect(() => {
 //
 // }, [isUploaded,isLoading])
 const FileData = () => {

  if (selectedFile) {
   return (
    <div>
     {/*<h2>File Details:</h2>*/}
     <p>File Name: {selectedFile.name}</p>

     <p>File Type: {selectedFile.type}</p>
     {/*<p>*/}
     {/* Last Modified:{" "}*/}
     {/* {selectedFile.lastModifiedDate.toDateString()}*/}
     {/*</p>*/}

    </div>
   );
  } else {
   return (
    <div>
     <br/>
     <h4>Resim seçiniz</h4>
    </div>
   );
  }
 };

 return (
  <div>
   <div className='flex flex-col w-[300px]  gap-2'>
    <input type="file" accept='image/png, image/jpg, image/jpeg, image/svg+xml' className=' mx-auto'
           onChange={onFileChange}/>
    <button className={`rounded-md py-1 flex items-center justify-evenly cursor-pointer ${buttonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-green-800 cursor-pointer"}`}
            disabled={buttonDisabled} onClick={() => onFileUpload()}>
     <span className='text-white font-bold'>{!isUploaded ? 'Upload' : isLoading ? 'Uploading' : 'Complate'}</span>
     <svg className='w-10 '
          fill={!isUploaded ? 'gray' : isLoading ? 'yellow' : 'green'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path
       d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z"/>
     </svg>
    </button>
   </div>
   {<FileData/>}
  </div>
 )
}

