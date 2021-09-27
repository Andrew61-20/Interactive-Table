import React from 'react';

export default props => (
    <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'job_title')}>
                    Job Title {props.sortField === 'job_title' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'organization_name')}>
                    Organization Name {props.sortField === 'organization_name' ? <small>{props.sort}</small> : null}
                </th>
                <th>Location Coordinates</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            { props.data !== [] && props.data !== undefined ? 
                props.data.map(item =>(
                    <tr key={item._id}>
                        <td>{item.job_title}</td>
                        <td>{item.organization_name}</td>
                        <td onClick={() => props.onMapComponent(item.location_coordinates[0], item.location_coordinates[1])
                            }
                        >
                            {item.location_coordinates}
                        </td>
                        <td>
                        <button 
                            className="btn btn-outline-secondary"
                            onClick={() => props.onRemove(item._id)} >Delete
                        </button>
                        </td>
                    </tr>
                )) : 
                <tr></tr>
            }
        </tbody>
    </table>
)
