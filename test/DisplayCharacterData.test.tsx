import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DisplayCharacterData from "@/features/characterDisplay/components/DisplayCharacterData";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/en.json";
import type { CharacterProfileData } from "@/common/types/GeneralTypes";
import { ROLES } from "@/common/types/GeneralTypes";

vi.mock(
  "@/features/characterDisplay/components/CharacterModalContainer",
  () => ({
    default: ({
      character,
      onClose,
    }: {
      character: CharacterProfileData;
      onClose: () => void;
    }) => (
      <div data-testid="character-modal">
        <h2>Modal for {character.name}</h2>
        <button onClick={onClose}>Close Modal</button>
      </div>
    ),
  })
);

const mockKillers: CharacterProfileData[] = [
  {
    number: 1,
    code: "trapper",
    name: "The Trapper",
    overview: "A hulking killer.",
    backstory: "...",
    nationality: "American",
    dlc: "Base Game",
    imgs: { portrait: "trapper.png" },
    role: "killer" as typeof ROLES.KILLER,
    fullName: "Evan MacMillan",
    gender: "Male",
    difficulty: "Easy",
    moveSpeed: "4.6 m/s",
    terrorRadius: 32,
    powerName: "Bear Trap",
    description: "",
    power: { powerName: "Bear Trap", powerCode: "beartrap" },
  },
  {
    number: 2,
    code: "wraith",
    name: "The Wraith",
    overview: "A stealthy killer.",
    backstory: "...",
    nationality: "Nigerian",
    dlc: "Base Game",
    imgs: { portrait: "wraith.png" },
    role: "killer" as typeof ROLES.KILLER,
    fullName: "Philip Ojomo",
    gender: "Male",
    difficulty: "Easy",
    moveSpeed: "4.6 m/s",
    terrorRadius: 32,
    powerName: "Wailing Bell",
    description: "",
    power: { powerName: "Wailing Bell", powerCode: "wailingbell" },
  },
];

describe("DisplayCharacterData", () => {
  it("should render PortraitCharacterList with its initial array of data", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <DisplayCharacterData
          initialCharacters={mockKillers}
          characterRole={ROLES.KILLER}
        />
      </NextIntlClientProvider>
    );

    expect(screen.getByText("The Trapper")).toBeInTheDocument();
    expect(screen.getByText("The Wraith")).toBeInTheDocument();
    expect(screen.queryByTestId("character-modal")).not.toBeInTheDocument();
  });

  it("should open and close the modal with the correct information of the character when doing click on it", async () => {
    const user = userEvent.setup();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <DisplayCharacterData
          initialCharacters={mockKillers}
          characterRole={ROLES.KILLER}
        />
      </NextIntlClientProvider>
    );

    const trapperButtons = screen.getAllByRole("button", {
      name: /the trapper/i,
    });
    await user.click(trapperButtons[0]);

    const modal = screen.getByTestId("character-modal");
    expect(modal).toBeInTheDocument();

    expect(screen.getByText("Modal for The Trapper")).toBeInTheDocument();

    const closeButton = screen.getByText("Close Modal");
    await user.click(closeButton);

    expect(screen.queryByTestId("character-modal")).not.toBeInTheDocument();
  });
});
