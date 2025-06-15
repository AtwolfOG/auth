import { type IconType } from "react-icons"
interface Input{
Icon: IconType,
setValue: (e:string) => void,
value: string,
placeholder: string,
type: string
}

export default function Input({Icon,setValue, value, placeholder,type}:Input){
    return (      <div className="w-9/10 my-4">
            <Icon className="absolute translate-x-1 translate-y-7/12"/>
            <input
              type={type}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              placeholder={placeholder}
              required
              className="border border-white/20 outline outline-white/20 rounded-2xl p-1 pl-6 w-full caret-white/20 text-white/40"
            />
          </div>)
}