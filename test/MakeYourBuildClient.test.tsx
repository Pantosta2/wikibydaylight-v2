import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MakeYourBuildClient from "@/features/perkBuilder/components/MakeYourBuildClient";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/en.json";

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
