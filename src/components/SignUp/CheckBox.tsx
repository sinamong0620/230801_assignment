import React,{useEffect, useState} from "react";
interface IProps {
    data:string;
    checkedBox: string[];
    CheckBoxcheckedHandler: (code: string, isChecked: boolean) => void;
}
const CheckBox = (props:IProps) => {
    const [isCheckBox, setIsCheckBox] = useState<boolean>(false);
    const OnCheck = (event:React.ChangeEvent<HTMLInputElement>) => {
        props.CheckBoxcheckedHandler(event.target.value,event.target.checked);
        setIsCheckBox(event.target.checked);
    }

    useEffect(()=>{
        if(props.checkedBox.includes(props.data)){
            setIsCheckBox(true);
        }
        else{
            setIsCheckBox(false);
        }
    },[props.checkedBox])
    return <label><input type="checkbox" name="check" value={props.data} checked={isCheckBox} onChange={OnCheck} required />{props.data}</label>
}
export default CheckBox;