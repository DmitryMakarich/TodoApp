import React, { useEffect, useState } from "react";
import LoadingHOC from "../hoc/loaderHoc/LoadingHOC";
import Todo from "../todo/todo";

const TodoWrapper = (props: any) => {

    const Hoc = LoadingHOC(Todo, props)

    return (
        <Hoc></Hoc>
    )

}

export default TodoWrapper