import { CapIcon } from "@/components/ui/icons";
import { CheckIcon, LockClosedIcon, UpdateIcon } from "@radix-ui/react-icons";

export const enrollmentStatuses = [
  {
    value: "active",
    label: "Active",
    icon: CheckIcon,
  },
  {
    value: "graduated",
    label: "Graduated",
    icon: CapIcon,
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: LockClosedIcon,
  },
  {
    value: "transferred",
    label: "Transferred",
    icon: UpdateIcon,
  },
];

export const enrollmentStatusIcon = {
  active: <CheckIcon className="w-4 h-4" />,
  graduated: <CapIcon className="w-4 h-4" />,
  inactive: <LockClosedIcon className="w-4 h-4" />,
  transferred: <UpdateIcon className="w-4 h-4" />,
};

export const gradeLevels = [
  {
    label: "1st",
    value: "1st",
  },
  {
    label: "2nd",
    value: "2nd",
  },
  {
    label: "3rd",
    value: "3rd",
  },
  {
    label: "4th",
    value: "4th",
  },
  {
    label: "5th",
    value: "5th",
  },
];
