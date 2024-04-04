import "./CustomInput.css"
export const CustomInput = ({
  className,
  type,
  name,
  value,
  placeholder,
  functionChange,
  onBlurFunction,
}) => {
  return (
    <input
      className={className}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={functionChange}
      onBlur={onBlurFunction}
    />
  )
}
