import { world, Block, Player, ItemStack, BlockPermutation } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

const plants: { typeId: string, state: string, value: number }[] = [
    {
        typeId: 'betterend:end_lotus_stem_plant',
        state: 'betterend:stem',
        value: 1
    },
    {
        typeId: 'betterend:end_lily_seed',
        state: 'betterend:growth',
        value: 4
    }
]

world.beforeEvents.worldInitialize.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:lotuslily', {
        onRandomTick({ block }) {
            const { dimension, location } = block;
            const randomPlant = plants[Math.floor(Math.random() * plants.length)];
            const state = randomPlant.state;
            const perm = BlockPermutation.resolve(randomPlant.typeId, {
                [state]: randomPlant.value
            });
            dimension.setBlockPermutation(location, perm);
        },
        onTick({ block }) {
            const { dimension, location } = block;
            const randomPlant = plants[Math.floor(Math.random() * plants.length)];
            const state = randomPlant.state;
            const perm = BlockPermutation.resolve(randomPlant.typeId, {
                [state]: randomPlant.value
            });
            dimension.setBlockPermutation(location, perm);
        }
    });
});