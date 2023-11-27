import * as React from 'react';
import { Fragment } from 'react';
import Toolbar from '@mui/material/Toolbar';

import {
    SaveButton,
    DeleteButton,
    ToolbarProps,
    useRecordContext,
    useNotify,
    useRedirect,
} from 'react-admin';

const AccountChartEditToolbar = (props: ToolbarProps) => {
    const { resource } = props;
    const redirect = useRedirect();
    const notify = useNotify();

    const record = useRecordContext(props);

    if (!record) return null;
    return (
        <Toolbar
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                minHeight: { sm: 0 },
            }}
        >
            <Fragment>
                <SaveButton
                    mutationOptions={{
                        onSuccess: () => {
                            notify('ra.notification.updated', {
                                type: 'info',
                                messageArgs: { smart_count: 1 },
                                undoable: true,
                            });
                            redirect('list', 'accountChart');
                        },
                    }}
                    type="button"
                />
                <DeleteButton record={record} resource={resource} />
            </Fragment>
        </Toolbar>
    );
};

export default AccountChartEditToolbar;