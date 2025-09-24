import Header from "../MainPage/Header"
import DirectoryFilters from "./DirectoryFilter"

function Members() {
  return (
    <div className="m-2">
        <Header />
        <h1 className="m-3 text-2xl font-bold">
            Members Directory
        </h1>
        <div className="container ">
            <DirectoryFilters />
        </div>
    </div>
  )
}

export default Members