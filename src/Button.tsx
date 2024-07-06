type PropsBtn = {
    title: string,
    onClickHandler: () => void,
}

export const Button = ({title, onClickHandler}:PropsBtn) => {
    return (
        <button onClick={onClickHandler}>{title}</button>
    );
};
