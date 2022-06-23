import {useState} from 'react'
import {storage} from '../firebase-app'
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'

function useUpload(param){
  var [error,setError] = useState(0)
  var [upload,setUpload] = useState(
    false
  )

  function failed(err){
    setError(() => {
      return err
    })
  }

  function snapshot(ss){
    console.log(ss)
  }

  async function onUploaded(ref,_id){
    try{
      var result = await getDownloadURL(
        ref
      )
      await param.onUploaded(
        result,_id
      )
    }
    catch(err){
      setError(() => {
        return err
      })
    }
    finally{
      setUpload(() => {
        return false
      })
    }
  }

  function uploadPath({name}){
    return `images/${name}`
  }

  function firebaseUpload(param){
    uploadBytesResumable(
      param.fileRef,
      param.file
    )
    .on(
      'state_changed',
      snapshot,failed,
      () => onUploaded(
        param.fileRef,
        param._id
      )
    )
  }

  function preUpload(file,_id){
    setError(() => {
      return null
    })
    setUpload(() => {
      return true
    })

    var fileRef = ref(
      storage,
      uploadPath(
        file
      )
    )

    firebaseUpload({
      fileRef,
      file,
      _id
    })
  }

  return [
    upload,
    error,
    preUpload
  ]
}

export {useUpload}

