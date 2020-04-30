#!/usr/bin/env bash




process=`ps aux | grep "\-avd ${avd}" | grep -v grep`
process_count=`echo ${process} | wc -l`

if [ "${process}" != "" ] && [ ${process_count} == 1 ]; then
  echo "simulator has started"
else
  avds=`ls ~/.android/avd | grep .avd | sed "s#.avd##"`
  avds=(${avds})
  avd_count=`ls ~/.android/avd | grep .avd | wc -l`

  echo ""
  echo "安卓模拟器列表："
  echo ""
  ls ~/.android/avd | grep .avd | sed "s#.avd##"
  echo ""

  if [ ${avd_count} == 0 ]; then
    echo "没有找到安卓模拟器，请到android studio中添加"
    exit 1
  elif [ ${avd_count} == 1 ]; then
    avd=${avds[0]}
  else
    # 需要从刚才的列表里任选一个
    read -p "你要启动哪个模拟器：" avd
    echo ""
  fi
  echo "模拟器${avd}正在启动..."
  cd ~/Library/Android/sdk/emulator/
  emulator -avd ${avd} & sleep 15 && echo "模拟器启动完成"
fi