import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MakeYourBuildClient from "@/features/perkBuilder/components/MakeYourBuildClient";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/en.json";
import type { Perk } from "@/common/types/GeneralTypes";

const mockSurvivorPerks: Perk[] = [
  {
    id: 1,
    name: "Sprint Burst",
    description: "Run fast",
    icon: "sprint.png",
    code: "p1",
  },
  {
    id: 2,
    name: "Adrenaline",
    description: "Heal at the end",
    icon: "adrenaline.png",
    code: "p2",
  },
  {
    id: 3,
    name: "Lithe",
    description: "Vault fast",
    icon: "lithe.png",
    code: "p3",
  },
  {
    id: 4,
    name: "Dead Hard",
    description: "Dodge a hit",
    icon: "deadhard.png",
    code: "p4",
  },
  {
    id: 5,
    name: "Unbreakable",
    description: "Pick yourself up",
    icon: "unbreakable.png",
    code: "p5",
  },
];

const mockKillerPerks: Perk[] = [
  {
    id: 101,
    name: "Hex: Ruin",
    description: "Regress generators",
    icon: "ruin.png",
    code: "kp1",
  },
];

describe("MakeYourBuildClient", () => {
  it("It render correctly without initial perks", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MakeYourBuildClient
          initialSurvivorPerks={[]}
          initialKillerPerks={[]}
        />
      </NextIntlClientProvider>
    );

    const headerText = screen.getByText(/Select up to 4 perks \(0\/4\)/i);
    expect(headerText).toBeInTheDocument();

    const emptySlots = screen.getAllByTitle("Empty Perk Slot");
    expect(emptySlots).toHaveLength(4);

    const noPerksMessage = screen.getByText("No perks found.");
    expect(noPerksMessage).toBeInTheDocument();

    const survivorButton = screen.getByRole("button", {
      name: "Survivor Perks",
    });
    const killerButton = screen.getByRole("button", { name: "Killer Perks" });
    const searchInput = screen.getByPlaceholderText(
      /Search perk by name, description.../i
    );

    expect(survivorButton).toBeInTheDocument();
    expect(killerButton).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });
});

describe("User interactions on MakeYourBuildClient", () => {
  it("should allow selecting and removing perks correctly", async () => {
    const user = userEvent.setup();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MakeYourBuildClient
          initialSurvivorPerks={mockSurvivorPerks}
          initialKillerPerks={mockKillerPerks}
        />
      </NextIntlClientProvider>
    );

    const sprintBurstCard = screen.getByText("Sprint Burst");
    await user.click(sprintBurstCard);

    expect(
      screen.getByText(/Select up to 4 perks \(1\/4\)/i)
    ).toBeInTheDocument();

    const selectedSprintBurst = screen.getByTitle("Remove Sprint Burst");
    expect(selectedSprintBurst).toBeInTheDocument();

    await user.click(screen.getByText("Adrenaline"));
    await user.click(screen.getByText("Lithe"));
    await user.click(screen.getByText("Dead Hard"));

    expect(
      screen.getByText(/Select up to 4 perks \(4\/4\)/i)
    ).toBeInTheDocument();

    const unbreakableCard = screen.getByText("Unbreakable");

    expect(unbreakableCard.closest("button")).toBeDisabled();

    const litheToRemove = screen.getByTitle("Remove Lithe");
    await user.click(litheToRemove);

    expect(
      screen.getByText(/Select up to 4 perks \(3\/4\)/i)
    ).toBeInTheDocument();

    expect(unbreakableCard.closest("button")).not.toBeDisabled();
  });
});
