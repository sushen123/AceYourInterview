
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
 import { CODE_SNIPPETS } from "./constant"
  import {LANGUAGE_VERSIONS} from './constant'

  const languages = Object.entries(LANGUAGE_VERSIONS)
export const LanguageSelector = ({language, onSelect, setValues}) => {


    return <div className="">
        <Select onValueChange={(value) => {
          onSelect(value)
          setValues(CODE_SNIPPETS[value])
          console.log(CODE_SNIPPETS[value])
        
        }}>
  <SelectTrigger className="w-36">
    <SelectValue className="bg-slate-700 hover:bg-black" placeholder="Languages" >
      {language}
      </SelectValue>

  </SelectTrigger>
  <SelectContent className="bg-slate-700 w-36 ">
    {languages.map(([lang, version]) => (
        <SelectItem  className={`flex text-white hover:text-black hover:bg-slate-400 ${lang === language ? "bg-blue-400": ""}`} key={lang} value={lang}>
          {lang}
         
        </SelectItem>
    ))}
  </SelectContent>
</Select>

    </div>
}