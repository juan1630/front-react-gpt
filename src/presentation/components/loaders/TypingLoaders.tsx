import './TypingLoader.css'
interface Props { 
  className: string
}
export  function TypingLoaders({ className }: Props) {
  return (
    <div className={`typing ${className}`} >
        <div className="circle scaling"></div>
        <div className="circle scaling"></div>
        <div className="circle scaling"></div>
    </div>
  )
}
