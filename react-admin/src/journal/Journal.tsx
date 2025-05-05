import { 
    InfiniteList,
} from "react-admin"
import { DatagridAG } from '@mattssoft/ra-datagrid-ag';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

export const Journal = () => {

    const defaultColDef = {
        flex: 1,
        filterParams: {
            maxNumConditions: 1,
            filterOptions: [
                'equals',
                'notEqual',
                'greaterThan',
                'greaterThanOrEqual',
                'lessThan',
                'lessThanOrEqual',
                'contains',
                'inRange',
                'blank',
            ],
        },
    };    
    

    const columnDefs = [
        {field: "date", editable: true },
        {field: "description", editable: true }
    ]
    

    return (
        <InfiniteList resource="Entry" pagination={false}>
            <DatagridAG
                className="ag-theme-balham"
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
                rowModelType="clientSide" 
            />
        </InfiniteList>
    );
}