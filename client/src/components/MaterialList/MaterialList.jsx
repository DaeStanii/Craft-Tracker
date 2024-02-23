const MaterialList = ({ materials = [] }) => {

    if (!materials.length) {
        return <h4>No Materials Added</h4>
    }

    return(
        <div>
            <h2 className="text-lg border-dashed border-b-2 border-black">Materials:</h2>
            <div>
                {materials &&
                    materials.map((material) => (
                        <div key={material._id}>
                            <h4 className="border-dotted border-b border-black">
                                {material.materialLabel}
                            </h4>
                            <h5 className="border-solid border-b border-black">
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