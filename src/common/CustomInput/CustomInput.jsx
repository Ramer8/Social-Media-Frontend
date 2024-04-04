import "./CustomInput.css"
export const CustomInput = ({
  design,
  type,
  name,
  value,
  placeholder,
  functionChange,
  onBlurFunction,
}) => {
  return (
    <input
      className={design}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={functionChange}
      onBlur={onBlurFunction}
    />
  )
}
