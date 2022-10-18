import { useLocation } from 'react-router-dom'

const Create = () => {
    const { state } = useLocation();
    console.log(state);
    return (
        <div>
            Create
        </div>
    );
};

export default Create;