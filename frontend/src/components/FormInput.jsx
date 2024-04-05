import style from '@/styles/components/FormInput.module.css'

export default function FormInput( { type, name, placeholder } ) {
  return (
    <input
      className={`${style.FormInput}`}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  )
}
