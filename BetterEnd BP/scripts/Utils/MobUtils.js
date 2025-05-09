export default class MobUtils {
    constructor(entity) {
        this.entity = entity;
        this.dimension = entity?.dimension;
        this.location = entity?.location;
        this.typeId = entity?.typeId;
    }
    slimeSkin() {
        if (this?.typeId === "minecraft:slime") {
            const slimeSkins = {
                "betterend:amber_moss": "slime_amber",
                "betterend:chorus_nylium": "slime_chorus",
                "betterend:end_moss_lakes": "slime_megalake",
                "betterend:end_moss": "slime_foggy",
            };
            const floor = this?.dimension.getBlock({ x: this.location.x, y: this.location.y - 1, z: this.location.z })?.typeId;
            const moss = Object.keys(slimeSkins).find((key) => key === floor);
            if (!moss)
                return;
            if (!this?.entity.hasTag("betterend:skin")) {
                this?.entity.addTag("betterend:skin");
                this?.entity.triggerEvent(slimeSkins[moss]);
            }
        }
    }
}
