import React from 'react'
import ReactECharts from 'echarts-for-react';

const Piechart = (props) => {

    const { data } = props

    const option = {
        title: {
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            left: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: '65%',
                data: [
                    { value: data.inactive, name: 'Inactive' },
                    { value: data.active, name: 'Active' }
                ],
                color: ['#fbc313', '#233c79'],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    return (
        <div>
            <ReactECharts
                option={option}
                style={{ height: 280, zIndex: "10px" }}
            />
        </div>
    )
}

export default Piechart
