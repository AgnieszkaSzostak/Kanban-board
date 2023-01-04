/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, {useContext} from "react";
import '../style.css'

import Column from "./Column";
import { ColumnsContext } from "./context";

function Board () {

    const {colState} = useContext(ColumnsContext);
    
    return (
        <div className="board">
            {colState.map(column => (
                <Column key={column.id} data={column}/>
            ))    
            }
        </div>
    )
}

export default Board;