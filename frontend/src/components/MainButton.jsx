import style from '@/styles/components/MainButton.module.css'

export default function MainButton( { onclick, msg } ) {
  return (
    <button
      className={style.MainButton} 
      type='button'
      onClick={ onclick 
        ? onclick 
        : (e) => ( e.preventDefault() ) }>{msg}</button>
  )
}