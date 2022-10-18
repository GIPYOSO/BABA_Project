let Memo = (props) => {
    console.log(props.value);
    return(
        <>
            <form id="note" className="note tabPg active">
                <p>메모</p>
                <p>
                  <textarea></textarea>
                </p>
            </form>
        </>
    )
}

export default Memo