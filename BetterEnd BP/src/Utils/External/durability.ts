import { EquipmentSlot, GameMode } from "@minecraft/server";
export function durability(player, item, damage = 1) {
    if (!item?.typeId.startsWith('betterend:') || player.getGameMode() === GameMode.Creative)
        return;
    const durability = item.getComponent('durability');
    const enchantable = item.getComponent('enchantable');
    const unbreaking = enchantable?.getEnchantment('unbreaking')?.level ?? 0;
    if (Math.random() * 100 <= (100 / (unbreaking + 1)))
        durability.damage += damage;
    const equip = player.equippable;
    equip.setEquipment(EquipmentSlot.Mainhand, durability.damage < durability.maxDurability ? item : player.playSound('random.break'));
}