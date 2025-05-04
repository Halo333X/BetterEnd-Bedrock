import { world } from '@minecraft/server';
const pillarTag = 'pillar_template:pillar';
class pillar_Manager {
    static updatePillarsAround(block) {
        let aboveBlock = undefined;
        try {
            aboveBlock = block.above(1);
        }
        catch { }
        let belowBlock = undefined;
        try {
            belowBlock = block.below(1);
        }
        catch { }
        const blocks = [
            aboveBlock,
            belowBlock,
            block
        ];
        for (const pillar of blocks) {
            if (pillar != undefined && pillar.hasTag(pillarTag))
                this.updatePillar(pillar);
        }
    }
    static updatePillar(block) {
        let aboveBlock = undefined;
        try {
            aboveBlock = block.above(1);
        }
        catch { }
        let belowBlock = undefined;
        try {
            belowBlock = block.below(1);
        }
        catch { }
        if (aboveBlock != undefined) {
            if (aboveBlock.hasTag(pillarTag)) {
                block.setPermutation(block.permutation.withState("pillar_template:top_bit", true));
            }
            else
                block.setPermutation(block.permutation.withState("pillar_template:top_bit", false));
        }
        else
            block.setPermutation(block.permutation.withState("pillar_template:top_bit", false));
        if (belowBlock != undefined) {
            if (belowBlock.hasTag(pillarTag)) {
                block.setPermutation(block.permutation.withState("pillar_template:bottom_bit", true));
            }
            else
                block.setPermutation(block.permutation.withState("pillar_template:bottom_bit", false));
        }
        else
            block.setPermutation(block.permutation.withState("pillar_template:bottom_bit", false));
    }
}
world.afterEvents.playerBreakBlock.subscribe((data) => {
    pillar_Manager.updatePillarsAround(data.block);
});
world.afterEvents.playerPlaceBlock.subscribe((data) => {
    pillar_Manager.updatePillarsAround(data.block);
});
