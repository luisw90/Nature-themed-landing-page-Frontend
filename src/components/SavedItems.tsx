import { FC } from 'react' // literally anything, don't even have to use it
import { UserItem } from '../Types'

type AddUserSavedItemProps = {
  userItems: UserItem[];
  DisplayThemeItem: (event: any) => void;
  RemoveThemeItem: (event: any) => void;
};

export const UserSavedItems: FC<AddUserSavedItemProps> = ({
  userItems,
  DisplayThemeItem,
  RemoveThemeItem,
}) => {
  return (
    <div className='saved__container'>
      {userItems &&
          userItems.map((data: UserItem) => {
            return <div key={data.id} className='saved__itemcontainer'>
                      <div className='btn__container'>
                        <button value={data.id} onClick={DisplayThemeItem} className='saved__item__favbtn'>Fav</button>
                        <button value={data.id} onClick={RemoveThemeItem} className='saved__item__deletebtn'>X</button>
                      </div>
                      <div className='saved__item__data'>
                        <h1 className='saved__title'>{data.category}</h1>
                        <p className='saved__fact'>{data.fact}</p>
                      </div>
                  </div>

      })}
    </div>
  )
}
