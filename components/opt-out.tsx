"use client";

import { Hand } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";

interface PopupProps {
  onAccept: () => void;
  onDeny: () => void;
}

interface WarningModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

// Accept Modal for when user opts in
export const AcceptModal: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
      {/* Header with Logo */}
      <div className="flex items-center justify-center gap-2 mb-4 pb-4 border-b border-gray-700">
        <div className="text-sm text-gray-400">Powered by:</div>
        <div className="flex items-center gap-2">
          <Image src={Logo} width={24} height={24} alt="Lucia Protocol Logo" />
          <span className="text-base text-white font-medium">
            Lucia Protocol
          </span>
        </div>
      </div>

      <h2 className="text-green-500 text-2xl font-bold mb-4 text-center">
        THANK YOU!
      </h2>
      <p className="text-gray-300 mb-6 text-center">
        Thank you for being a part of our journey! Your data is in safe hands,
        you can check to see if you received rewards{" "}
        <a href="#" className="text-orange-400 hover:text-orange-300 underline">
          here
        </a>
      </p>
      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="btn w-full outline outline-1 outline-slate-300 bg-transparent text-white shadow hover:drop-shadow-lg hover:outline-2 hover:outline-orange-500 hover:bg-orange-50 hover:text-stone-800 sm:w-auto"
        >
          Exit
        </button>
      </div>
    </div>
  </div>
);

// Warning Modal for when user clicks opt out from the dashboard this tells them they will lose all future revenue rewards if they proceed
export const WarningModal: React.FC<WarningModalProps> = ({
  onConfirm,
  onCancel,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
      {/* Header with Logo */}
      <div className="flex items-center justify-center gap-2 mb-4 pb-4 border-b border-gray-700">
        <div className="text-sm text-gray-400">Powered by:</div>
        <div className="flex items-center gap-2">
          <Image src={Logo} width={24} height={24} alt="Lucia Protocol Logo" />
          <span className="text-base text-white font-medium">
            Lucia Protocol
          </span>
        </div>
      </div>

      <h2 className="text-red-500 text-2xl font-bold mb-4 text-center">
        WARNING
      </h2>
      <p className="text-gray-300 mb-6 text-center">
        You will lose all future revenue rewards if you proceed. <br />{" "}
        <a href="#" className="text-orange-400 hover:text-orange-300 underline">
          Learn more...
        </a>{" "}
        <br /> <br /> Are you sure?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="btn w-full outline outline-1 outline-slate-300 bg-transparent text-white shadow hover:drop-shadow-lg hover:outline-2 hover:outline-orange-500 hover:bg-orange-50 hover:text-stone-800 sm:w-auto"
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          className="btn w-full outline outline-1 outline-slate-300 bg-transparent text-white shadow hover:drop-shadow-lg hover:outline-2 hover:outline-orange-500 hover:bg-orange-50 hover:text-stone-800 sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

// Cancel Modal for when user clicks deny from the main popup, reads the warning, and decides to opt in
export const CancelModal: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
      {/* Header with Logo */}
      <div className="flex items-center justify-center gap-2 mb-4 pb-4 border-b border-gray-700">
        <div className="text-sm text-gray-400">Powered by:</div>
        <div className="flex items-center gap-2">
          <Image src={Logo} width={24} height={24} alt="Lucia Protocol Logo" />
          <span className="text-base text-white font-medium">
            Lucia Protocol
          </span>
        </div>
      </div>

      <h2 className="text-green-500 text-2xl font-bold mb-4 text-center">
        THANK YOU!
      </h2>
      <p className="text-gray-300 mb-6 text-center">
        Thank you for being a part of our journey, you can see how much
        you&apos;ve received in rewards{" "}
        <a href="#" className="text-orange-400 hover:text-orange-300 underline">
          here
        </a>
      </p>
      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="btn w-full outline outline-1 outline-slate-300 bg-transparent text-white shadow hover:drop-shadow-lg hover:outline-2 hover:outline-orange-500 hover:bg-orange-50 hover:text-stone-800 sm:w-auto"
        >
          Exit
        </button>
      </div>
    </div>
  </div>
);

// Confirm Modal for when user clicks confirm from the warning modal, reads the warning, and decides to opt out
export const ConfirmModal: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
      {/* Header with Logo */}
      <div className="flex items-center justify-center gap-2 mb-4 pb-4 border-b border-gray-700">
        <div className="text-sm text-gray-400">Powered by:</div>
        <div className="flex items-center gap-2">
          <Image src={Logo} width={24} height={24} alt="Lucia Protocol Logo" />
          <span className="text-base text-white font-medium">
            Lucia Protocol
          </span>
        </div>
      </div>

      <h2 className="text-white text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
        WE HATE TO SEE YOU GO! <Hand className="w-6 h-6" />
      </h2>
      <p className="text-gray-300 mb-6 text-center">
        Vault data deletion occurs 24 hours upon trigger activation. Rest
        assured you can always opt back in and start earning rewards by going{" "}
        <a href="#" className="text-orange-400 hover:text-orange-300 underline">
          here
        </a>
      </p>
      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="btn w-full outline outline-1 outline-slate-300 bg-transparent text-white shadow hover:drop-shadow-lg hover:outline-2 hover:outline-orange-500 hover:bg-orange-50 hover:text-stone-800 sm:w-auto"
        >
          Exit
        </button>
      </div>
    </div>
  </div>
);

// Main Popup for when user clicks opt out from the dashboard
export const BottomRightPopup: React.FC<PopupProps> = ({
  onAccept,
  onDeny,
}) => (
  <div className="fixed bottom-0 right-0 left-0 mx-auto w-full md:bottom-4 md:right-4 md:left-auto md:mx-0 md:w-auto bg-gray-900 p-6 rounded-lg shadow-lg text-white z-50 max-w-xl">
    {/* Header with Logo */}
    <div className="flex items-center justify-center gap-2 mb-4 pb-4 border-b border-gray-700">
      <div className="text-sm text-gray-400">Powered by:</div>
      <div className="flex items-center gap-2">
        <Image src={Logo} width={24} height={24} alt="Lucia Protocol Logo" />
        <span className="text-base text-white font-medium">Lucia Protocol</span>
      </div>
    </div>

    {/* Description */}
    <div className="mb-6 text-sm text-gray-300 leading-relaxed text-center">
      <p className="mb-4">
        We encrypt and store your private information in fragments across
        multiple decentralized nodes. This provides complete privacy to you and
        your data and gives us the ability to make inisghts on current market
        trends.{" "}
        <a href="#" className="text-orange-400 hover:text-orange-300 underline">
          Learn more...
        </a>
      </p>
      <p className="mb-4">
        The best part? <br />
        <span className="text-orange-400">
          YOU GET REWARDED WHEN SOMEONE LICENSES YOUR DATA!
        </span>{" "}
      </p>

      {/* Terms and Privacy Buttons */}
      <div className="flex justify-center gap-3 mb-4">
        <button className="text-xs text-gray-400 hover:text-orange-400 underline transition-colors">
          Terms of Service
        </button>
        <button className="text-xs text-gray-400 hover:text-orange-400 underline transition-colors">
          Privacy Policy
        </button>
      </div>

      <p className="font-medium mb-4">
        Would you like to opt out of data collection?
      </p>
    </div>

    {/* Buttons */}
    <div className="flex justify-center gap-4">
      <button
        onClick={onAccept}
        className="btn w-full outline outline-1 outline-slate-300 bg-transparent text-white shadow hover:drop-shadow-lg hover:outline-2 hover:outline-orange-500 hover:bg-orange-50 hover:text-stone-800 sm:w-auto"
      >
        Accept
      </button>
      <button
        onClick={onDeny}
        className="btn w-full outline outline-1 outline-slate-300 bg-transparent text-white shadow hover:drop-shadow-lg hover:outline-2 hover:outline-orange-500 hover:bg-orange-50 hover:text-stone-800 sm:w-auto"
      >
        Deny
      </button>
    </div>
  </div>
);
