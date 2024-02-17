const MaterialList = ({ materials = [] }) => {

    if (!materials.length) {
        return <h4>No Materials Added</h4>
    }

    return(
        <div>
            <h2>Materials:</h2>
            <div>
                {materials &&
                    materials.map((material) => (
                        <div className="border-2" key={material._id}>
                            <h4>
                                {material.materialLabel}
                            </h4>
                            <h5>
                                {material.materialDetail}
                            </h5>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MaterialList;