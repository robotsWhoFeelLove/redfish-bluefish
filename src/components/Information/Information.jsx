import sampleData from "../../assets/sampleData.json";
import DataBoard from "../DataBoard/DataBoard";

//ataBoard({ data, setData, groupedData, setGroupedData, uploadHandler, unfilteredData, setUnfilteredData, sizes })
function Information() {
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg"></h3>
        <div>{/* <DataBoard data={sampleData} /> */}</div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Information;
