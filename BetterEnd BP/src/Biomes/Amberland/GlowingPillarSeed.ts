import { world, Block, Player, ItemStack, Vector3 } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

const structures: string[] = [ "glowing_pillar1", "glowing_pillar2" ];

world.beforeEvents.worldInitialize.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:glowing_pillar_seed', {
        onPlayerDestroy({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:glowing_pillar_seed');
        },
        onPlayerInteract({ block, player }) {
            const offset: Vector3 = {
                x: block.location.x - 1,
                y: block.location.y + 0,
                z: block.location.z - 1
            }
            new PlantUtils(block, player).boneMealGrowth(4, true, structures, offset, false);
        },
        onRandomTick({ block }) {
            const offset: Vector3 = {
                x: block.location.x - 1,
                y: block.location.y + 0,
                z: block.location.z - 1
            }
            new PlantUtils(block).randomTickinigGrowth(4, true, structures, offset, false);
        },
    });
});