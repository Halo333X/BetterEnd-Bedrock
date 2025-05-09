import { world, Block, Player, ItemStack } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

world.beforeEvents.worldInitialize.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:blossom_berry_seed', {
        onPlayerDestroy({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:blossom_berry_seed');
        },
        onPlayerInteract({ block, player }) {
            new PlantUtils(block, player).boneMealGrowth(3, false, null, null, false);
        },
        onRandomTick({ block }) {
            new PlantUtils(block).randomTickinigGrowth(3, false, null, null, false);
        },
    });
});