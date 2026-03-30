
import { FiBox } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
export default function PackageDetails() {
  return (
    <div className="bg-white p-5 rounded-lg shadow border">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FiBox className="text-[#9FB133] text-lg" />
        <h3 className="font-semibold text-gray-800">
          Package Details
        </h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-y-4 text-sm">
        
        {/* Row 1 */}
        <div>
          <p className="text-gray-400">Vehicle</p>
          <p className="font-medium text-gray-800">24.5 lbs</p>
        </div>

        <div>
          <p className="text-gray-400">Weight</p>
          <p className="font-medium text-gray-800">24.5 lbs</p>
        </div>

        <div>
          <p className="text-gray-400">Dimensions</p>
          <p className="font-medium text-gray-800">
            18" × 12" × 8"
          </p>
        </div>

        <div>
          <p className="text-gray-400">Package Type</p>
          <p className="font-medium text-gray-800">
            Standard Box
          </p>
        </div>

        {/* Row 2 */}
        <div>
          <p className="text-gray-400">Service Type</p>
          <p className="font-medium text-gray-800">
            Express Delivery
          </p>
        </div>

        <div>
          <p className="text-gray-400">Service Type</p>
          <p className="font-medium text-gray-800">
            Express Delivery
          </p>
        </div>

        <div>
          <p className="text-gray-400">Declared Value</p>
          <p className="font-medium text-gray-800">
            ₹450.00
          </p>
        </div>

        <div>
          <p className="text-gray-400">Fragile</p>
          <p className="font-medium text-gray-800">
            Yes
          </p>
        </div>

      </div>
    </div>
  );
}