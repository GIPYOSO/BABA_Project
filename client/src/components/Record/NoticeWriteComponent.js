import Editor from './EditorComponent';
import { useState } from "react";

const NoticeWriteComponent = (props) => {
    //console.log(props);
    const [desc, setDesc] = useState(props.value.contents);

    function onEditorChange(value) {
        setDesc(value);
        props.setNoteData({
            ...props.value,
            contents : desc
        })
        //console.log(props.value.contents);
    }
    
    return (
        <div>
          <Editor value={desc} onChange={onEditorChange} />
        </div>
    )
};

export default NoticeWriteComponent;