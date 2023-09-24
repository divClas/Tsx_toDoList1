import { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}
function EditableSpan(props: EditableSpanPropsType) {
    
    
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title);

    const activateEditMode = () => {

        setEditMode(true);
        setTitle(props.title)
    };

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };


    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input onChange={onChangeTitleHandler}
            value={title}
            onBlur={activateViewMode}
            autoFocus={true} />
        : <span onDoubleClick={activateEditMode} >{props.title}</span>
}
export default EditableSpan;