import { EquipmentSlot } from "@minecraft/server";
export const Armors = [
    {
        id: 'betterend:crystalite_boots',
        effect: 'speed',
        duration: 40,
        amplifier: 1,
        slot: EquipmentSlot.Feet
    },
    {
        id: 'betterend:crystalite_leggings',
        effect: 'jump_boost',
        duration: 40,
        amplifier: 0,
        slot: EquipmentSlot.Legs
    },
    {
        id: 'betterend:crystalite_chestplate',
        effect: 'regeneration',
        duration: 40,
        amplifier: 1,
        slot: EquipmentSlot.Chest
    },
    {
        id: 'betterend:crystalite_helmet',
        effect: 'conduit_power',
        duration: 40,
        amplifier: 0,
        slot: EquipmentSlot.Head
    }
];
