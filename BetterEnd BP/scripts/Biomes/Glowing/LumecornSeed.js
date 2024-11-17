import { world } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
const structures = [
    "lumecorn1",
    "lumecorn2"
];
world.beforeEvents.worldInitialize.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:lumecorn_seed', {
        onPlayerDestroy({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:lumecorn_seed');
        },
        onPlayerInteract({ block, player }) {
            const offset = {
                x: block.location.x,
                y: block.location.y,
                z: block.location.z
            };
            new PlantUtils(block, player).boneMealGrowth(4, true, structures, offset, false);
        },
        onRandomTick({ block }) {
            const offset = {
                x: block.location.x,
                y: block.location.y,
                z: block.location.z
            };
            new PlantUtils(block).randomTickinigGrowth(4, true, structures, offset, false);
        },
    });
});
