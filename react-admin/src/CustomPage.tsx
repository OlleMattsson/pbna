import React from 'react';
import { Loading, Datagrid, List, TextField, useGetList } from 'react-admin';

const CustomPage = () => {
    // Fetch data from the first resource
    const { data: data1, isLoading: loading1, error: error1 } = useGetList('AccountChart',{
        pagination: { page: 1, perPage: 10 }, 
        sort: { field: 'id', order: 'ASC' } 
    });

    // Fetch data from the second resource
    const { data: data2, isLoading: loading2, error: error2 } = useGetList('Account',{
        pagination: { page: 1, perPage: 10 }, 
        sort: { field: 'id', order: 'ASC' } 
    });

    if (loading1 || loading2) return <Loading />;
    if (error1 || error2) return (<div>Error</div>);

    console.log(data1)
    console.log(data2)

    return (
        <div>
            <List>
                <Datagrid data={data1} ids={data1.map(record => record.id)}>
                    {/* Fields for Resource1 */}
                    <TextField source="name" />
                    <TextField source="description" />
                </Datagrid>
            </List>
            <List>
                <Datagrid data={data2} ids={data2.map(record => record.id)}>
                    {/* Fields for Resource2 */}
                    <TextField source="account" />
                    <TextField source="name" />
                </Datagrid>
            </List>
        </div>
    );
};

export default CustomPage;