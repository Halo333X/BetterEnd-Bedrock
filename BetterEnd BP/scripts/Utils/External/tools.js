import { system, world } from '@minecraft/server'; // requires 1.9.0-beta in the manifest.json (including beta api toggle in-game)
// durability code emitted - found in other post
const hoes = [
    'betterend:aeternium_hoe',
];
const tillable = [
    'minecraft:dirt',
    'minecraft:grass',
    'minecraft:grass_path',
    'minecraft:dirt_with_roots'
];
world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    const { itemStack, block, player } = event;
    if (!itemStack)
        return;
    if (!tillable.includes(block.typeId))
        return;
    if (!hoes.includes(itemStack.typeId))
        return;
    const blockAbove = block.dimension.getBlock(block.location).above(1);
    if (blockAbove.isAir)
        try {
            const unbreakingLvl = itemStack.getComponent('enchantable').getEnchantment('unbreaking')?.level ?? 0;
            const breakingPercentageChance = 100 / (unbreakingLvl + 1);
            const breakingRandomChance = (Math.random() * 100); // this is our durability calculation formula. more information in the durability post/script
            if (breakingPercentageChance < breakingRandomChance)
                return;
            system.run(function () {
                itemStack.getComponent('durability').damage += 1;
                player.playSound('use.gravel', { pitch: 1, location: player.location, volume: 1 });
                player.getComponent('inventory').container.setItem(player.selectedSlotIndex, itemStack);
            });
        }
        catch (error) {
            system.run(function () {
                player.playSound('random.break', { pitch: 1, location: player.location, volume: 1 });
                player.getComponent('inventory').container.setItem(player.selectedSlotIndex);
            });
        }
});
const shovels = [
    'betterend:aeternium_shovel',
];
const dirt = [
    'minecraft:dirt',
    'minecraft:grass',
    'minecraft:dirt_with_roots',
    'minecraft:mycelium',
    'minecraft:podzol'
];
const grass = [
    'minecraft:grass'
];
world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    const { itemStack, block, player } = event;
    if (!itemStack)
        return;
    if (!dirt.includes(block.typeId))
        return;
    if (!shovels.includes(itemStack.typeId))
        return;
    const blockAbove = block.dimension.getBlock(block.location).above(1);
    if (blockAbove.isAir)
        try {
            const unbreakingLvl = itemStack.getComponent('enchantable').getEnchantment('unbreaking')?.level ?? 0;
            const breakingPercentageChance = 100 / (unbreakingLvl + 1);
            const breakingRandomChance = (Math.random() * 100);
            if (breakingPercentageChance < breakingRandomChance)
                return;
            if (!grass.includes(block.typeId)) // this determines that the block being made into a path is not grass, as the vanilla is_shovel tag already replaces grass
                system.run(function () {
                    block.setType("minecraft:grass_path");
                });
            system.run(function () {
                itemStack.getComponent('durability').damage += 1;
                player.playSound('use.grass', { pitch: 1, location: player.location, volume: 1 });
                player.getComponent('inventory').container.setItem(player.selectedSlotIndex, itemStack);
            });
        }
        catch (error) {
            system.run(function () {
                player.playSound('random.break', { pitch: 1, location: player.location, volume: 1 });
                player.getComponent('inventory').container.setItem(player.selectedSlotIndex);
            });
        }
});
const axes = [
    'betterend:aeternium_axe',
];
const strippable = [
    'minecraft:oak_log',
    'minecraft:birch_log',
    'minecraft:acacia_log',
    'minecraft:dark_oak_log',
    'minecraft:jungle_log',
    'minecraft:spruce_log',
    'minecraft:mangrove_log',
    'minecraft:cherry_log',
    'minecraft:bamboo_block',
    'minecraft:warped_stem',
    'minecraft:crimson_stem'
];
const log = [
    'minecraft:oak_log',
    'minecraft:birch_log',
    'minecraft:acacia_log',
    'minecraft:dark_oak_log',
    'minecraft:jungle_log',
    'minecraft:spruce_log',
    'minecraft:mangrove_log',
];
const cherry_log = [
    'minecraft:cherry_log'
];
const bamboo_block = [
    'minecraft:bamboo_block'
];
const stem = [
    'minecraft:warped_stem',
    'minecraft:crimson_stem'
];
world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    const { itemStack, block, player } = event;
    if (!itemStack)
        return;
    if (!strippable.includes(block.typeId))
        return;
    if (!axes.includes(itemStack.typeId))
        return;
    try {
        const unbreakingLvl = itemStack.getComponent('enchantable').getEnchantment('unbreaking')?.level ?? 0;
        const breakingPercentageChance = 100 / (unbreakingLvl + 1);
        const breakingRandomChance = (Math.random() * 100);
        if (breakingPercentageChance < breakingRandomChance)
            return;
        if (log.includes(block.typeId))
            system.run(function () {
                player.playSound('use.wood', { pitch: 1, location: player.location, volume: 1 });
            });
        if (cherry_log.includes(block.typeId))
            system.run(function () {
                player.playSound('step.cherry_wood', { pitch: 1, location: player.location, volume: 1 });
            });
        if (bamboo_block.includes(block.typeId))
            system.run(function () {
                player.playSound('step.bamboo_wood', { pitch: 1, location: player.location, volume: 1 });
            });
        if (stem.includes(block.typeId))
            system.run(function () {
                player.playSound('use.stem', { pitch: 1, location: player.location, volume: 1 });
            });
        system.run(function () {
            itemStack.getComponent('durability').damage += 1;
            player.getComponent('inventory').container.setItem(player.selectedSlotIndex, itemStack);
        });
    }
    catch (error) {
        system.run(function () {
            player.playSound('random.break', { pitch: 1, location: player.location, volume: 1 });
            player.getComponent('inventory').container.setItem(player.selectedSlotIndex);
        });
    }
});
