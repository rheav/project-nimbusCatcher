/* eslint-disable react/prop-types */
import tagsLogos from "./Logos"; // Update the path accordingly

function Table({ dataContent, dataType }) {
  return (
    <div className="w-[450px]">
      <table className="text-sm text-left rtl:text-right text-gray-500 border border-frost bg-fog bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 rounded-md overflow-hidden shadow-lg shadow-frost/40 w-full">
        <thead className="text-xs text-ocean border-b border-frost/20 shadow-md shadow-sky/40">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 font-normal text-center rounded-t-md"
            >
              Tag
            </th>
            <th
              scope="col"
              className="px-6 py-3 font-normal text-center rounded-t-md"
              style={{ width: "23.33%" }} // Adjust the width as needed
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 font-normal text-center rounded-t-md"
              style={{ width: "33.33%" }} // Adjust the width as needed
            >
              Quantas vezes?
            </th>
          </tr>
        </thead>
        <tbody className="rounded-b-md">
          {dataContent.map((dataItem) => (
            <tr
              key={dataItem.name}
              className="hover:bg-sky hover:bg-opacity-70 transition duration-200 cursor-pointer items-center "
            >
              <td className="pl-6 py-3 flex  gap-x-2">
                {tagsLogos[dataItem.name] && (
                  <img
                    className="w-5 h-5"
                    src={tagsLogos[dataItem.name]}
                    alt={dataItem.name}
                  />
                )}
                <span className="font-normal text-[0.7rem] text-[#0366d6]">
                  {dataItem.name}
                </span>
              </td>
              <td className="px-6 py-3 text-center">
                <div className="flex items-center justify-center h-full">
                  {/* Ensure the pulse does not affect layout */}
                  <div
                    className={`h-2 w-2 rounded-full mr-2 ${
                      dataItem.status === "Online"
                        ? "bg-emerald pulseLiveGRN animate-pulseLiveGRN"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span
                    className={`text-[0.7rem] ${
                      dataItem.status === "Online"
                        ? "text-forest"
                        : "text-pebble"
                    }`}
                  >
                    {dataItem.status}
                  </span>
                </div>
              </td>
              <td className="px-6 py-3 text-center">
                <div className="flex justify-center items-center h-full">
                  {/* Ensure consistent size and vertical alignment */}
                  <div
                    className={`h-2 w-2 rounded-full mr-2 ${
                      dataItem.occurrences > 1
                        ? "bg-sandy pulseLiveYLW animate-pulseLiveYLW"
                        : ""
                    }`}
                  ></div>
                  <span className="text-[0.7rem]">{dataItem.occurrences}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {dataType === "scripts" && (
        <div className="mt-4 text-xs text-left rtl:text-right  border border-frost/40 bg-gradient-to-r from-frost to-sapphire/50 text-snow rounded-md overflow-hidden shadow-lg shadow-frost/40 w-full font-light  p-2">
          💡 Um pixel detectado 2x não necessariamente indica um disparo
          duplicado! ➡️ Exemplo: <strong>Google Ads</strong> pode se dividir
          entre <i>conversão</i> e<i> remarketing</i>.
        </div>
      )}
    </div>
  );
}

export default Table;
