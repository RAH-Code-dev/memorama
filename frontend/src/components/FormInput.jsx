import style from '@/styles/components/FormInput.module.css'

export default function FormInput( { type, name, placeholder, className, value, onChange } ) {
  return (
    <input
      className={`${style.FormInput} ${className}`}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
