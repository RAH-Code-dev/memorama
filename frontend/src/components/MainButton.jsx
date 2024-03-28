import style from '@/styles/components/MainButton.module.css'

export default function MainButton( { onclick, msg, width, level = 1 } ) {
  const buttonStyle = width ? { width: width } : {}
  let levelStyle = style[`MainButton__${level}`]
  /**
   * Only 3 levels are allowed for now
   */

  return (
    <button
      style={buttonStyle}
      className={`${style.MainButton} ${levelStyle}`} 
      type='button'
      onClick={ onclick 
        ? onclick
        : (e) => ( e.preventDefault() ) }>{msg}</button>
  )
}