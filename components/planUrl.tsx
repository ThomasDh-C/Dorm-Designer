import React from 'react'
import { Input } from 'antd'

const { Search } = Input

const PlanUrl = ({ setPlanUrl }) => {

    const onSearch = value => setPlanUrl(value);
    // http://rooms.tigerapps.org/static/newrooms/svgz/0010-02.svgz
    return (
        <>

            <Search
                placeholder="input search text"
                enterButton="Confirm Map URL"
                size="large"
                onSearch={onSearch}
                style={{ marginBottom: '32px' }}
            />
        </>
    )
}

export default PlanUrl